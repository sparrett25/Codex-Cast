export default function Background({ name }) {
  // name examples: "plan-dawn", "summary-overcast", "mirrorlake"
  return <div className={`absolute inset-0 -z-10 bg-cover bg-center bg-${name}`} />;
}
