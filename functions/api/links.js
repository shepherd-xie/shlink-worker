export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (id) {
    // 返回特定短链信息
    const link = await env.DB.prepare(`SELECT * FROM links WHERE id = ?`).bind(id).first();
    return Response.json(link, { status: 200 });
  } else {
    // 返回所有短链
    const links = await env.DB.prepare(`SELECT * FROM links`).all();

    const res = [];
    const origin = new URL(request.url).origin;
    links.results.forEach(link => {
      res.push(
        {
          id: link.id,
          originalUrl: link.original_url,
          slug: link.slug,
          shortUrl: `${origin}/${link.slug}`,
          createdAt: link.created_at
        }
      )
    })
    return Response.json(res, { status: 200 });
  }
}

export async function onRequestDelete({ request, env }) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (id) {
    await env.DB.prepare(`DELETE FROM links WHERE id = ?`).bind(id).run();
    return new Response('Link deleted', { status: 204 });
  }
  return new Response('ID not provided', { status: 400 });
}
