export async function onRequest({ params, request, env }) {
  const { slug } = params;
  const link = await env.DB.prepare(`SELECT original_url FROM links WHERE slug = ?`).bind(slug).first();

  if (link) {
    await env.DB.prepare(`INSERT INTO logs (slug, ip, user_agent) VALUES (?, ?, ?)`)
      .bind(slug, request.headers.get('cf-connecting-ip'), request.headers.get('user-agent'))
      .run();

    return Response.redirect(link.original_url, 301);
  } else {
    return new Response('Short URL not found', { status: 404 });
  }
}
