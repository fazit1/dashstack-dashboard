declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module 'tailwindcss/tailwind.css' {
  const content: any;
  export default content;
} 