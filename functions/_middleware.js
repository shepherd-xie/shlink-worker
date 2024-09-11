async function errorHandling(context) {
  try {
    return await context.next();
  } catch (err) {
    return new Response(`${err.message}\n${err.stack}`, { status: 500 });
  }
}

function authentication(context) {
  const { request, env } = context;

  const pathname = new URL(request.url).pathname;

  if (pathname === '' || pathname === '/' || !pathname.includes('/api/')) {
    return context.next()
  }

  const token = request.headers.get('Authorization');

  if (!token || token !== env.SECRET_TOKEN) {
    return new Response('Unauthorized', { status: 401 });
  }

  // 如果授权通过，继续处理请求
  return context.next();
}

export const onRequest = [errorHandling, authentication];
