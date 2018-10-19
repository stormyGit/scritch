import client from './apolloClient';

export default (theme) => {
  client.writeData({ data: { theme: theme || process.env.DEFAULT_THEME }});
  document.querySelector("meta[name='theme-color']").remove();

  const meta = document.createElement("meta");
  meta.setAttribute("name", "theme-color");
  meta.setAttribute("content", theme === 'dark' ? '#111' : '#eee');
  document.querySelector("head").appendChild(meta);
}
