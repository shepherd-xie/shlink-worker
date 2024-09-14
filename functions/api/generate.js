export async function onRequestPost({ request, env }) {
  const { url, slug } = await request.json();
  const finalSlug = slug || generateRandomSlug(4)
  const originUrl = new URL(request.url);
  const origin = `${originUrl.protocol}//${originUrl.hostname}`

  if (!url) return Response.json({ message: 'Missing required parameter: url.' });

  // url格式检查
  if (!/^https?:\/\/.{3,}/.test(url)) {
    return Response.json({ message: 'Illegal format: url.' },{
      status: 400
    })
  }

  // 自定义slug长度检查 2<slug<10 是否不以文件后缀结尾
  if (slug && (slug.length < 2 || slug.length > 10 || /.+\.[a-zA-Z]+$/.test(slug))) {
    return Response.json({ message: 'Illegal length: slug, (>= 2 && <= 10), or not ending with a file extension.' },{
      status: 400
    });
  }


  try {

    // 如果自定义slug
    if (slug) {
      const existUrl = await env.DB.prepare(`SELECT url FROM links where slug = '${slug}'`).first()

      // url & slug 是一样的。
      if (existUrl && existUrl.url === url) {
        return Response.json({ slug, link: `${origin}/${finalSlug}` },{
          status: 200
        })
      }

      // slug 已存在
      if (existUrl) {
        return Response.json({ message: 'Slug already exists.' },{
          status: 200
        })
      }
    }

    // 目标 url 已存在
    const existSlug = await env.DB.prepare(`SELECT slug as existSlug FROM links where url = '${url}'`).first()

    // url 存在且没有自定义 slug
    if (existSlug && !slug) {
      return Response.json({ slug: existSlug.slug, link: `${origin}/${existSlug.slug}` },{
        status: 200
      })
    }

    const bodyUrl = new URL(url);

    if (bodyUrl.hostname === originUrl.hostname) {
      return Response.json({
        message: 'You cannot shorten a link to the same domain.'
      }, { status: 400 })
    }

    await env.DB.prepare(
      `INSERT INTO links (original_url, slug) VALUES (?, ?)`
    ).bind(url, finalSlug).run();

    const shortUrl = `${origin}/${finalSlug}`;

    return Response.json({
      slug: finalSlug,
      link: shortUrl
    }, { status: 200 });
  } catch (error) {
    return new Response('Slug already exists or invalid', { status: 400 });
  }
}

function generateRandomSlug(length) {
  const characters = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}
