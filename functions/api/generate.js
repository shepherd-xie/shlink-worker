export async function onRequestPost({ request, env }) {
  const { originalUrl, slug } = await request.json();
  const final_slug = slug || generateRandomSlug()

  try {
    await env.DB.prepare(
      `INSERT INTO links (original_url, slug) VALUES (?, ?)`
    ).bind(originalUrl, final_slug).run();

    const shortUrl = `${new URL(request.url).origin}/${final_slug}`;

    return Response.json({
      slug: final_slug,
      shortUrl: shortUrl
    }, { status: 200 });
  } catch (error) {
    return new Response('Slug already exists or invalid', { status: 400 });
  }
}

function generateRandomSlug() {
  return Math.random().toString(36).substring(2, 8);
}
