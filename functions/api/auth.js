export async function onRequestPost({ request, env }) {
  const { token } = await request.json();

  console.log(`token = [${token}]`)
  console.log(`SECRET_TOKEN = [${env.SECRET_TOKEN}]`)

  // 验证 token 的逻辑
  if (token === env.SECRET_TOKEN) {
    return Response.json({ success: true }, { status: 200 });
  } else {
    return Response.json({ success: false, message: 'Invalid token' }, { status: 401 });
  }
}
