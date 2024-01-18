export default function date(time) {
  const dateCalc = new Date(time * 1000);
  return dateCalc.toLocaleDateString();
}
