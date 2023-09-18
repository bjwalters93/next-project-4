//   -----------------------------------------------
//   const [charlie, setCharlie] = useState<any>(["0", "0", "0"]);
//   useEffect(() => {
//     // window is accessible here.
//     const daisyHSL = window
//       .getComputedStyle(document.documentElement)
//       .getPropertyValue("--p")
//       .split(" ");
//     console.log("window.getComputedStyle", daisyHSL);
//     setCharlie(daisyHSL);
//   }, []);

//   -----------------------------------------------
//   console.log("daisyHSL:", charlie);
//   -----------------------------------------------
//   -----------------------------------------------
//   function hslToHex(hslString: string) {
//     console.log("hslString:", hslString);
//     let splitHsl = hslString.split(" ");
//     let h = Number(splitHsl[0]);
//     let s = Number(splitHsl[1].slice(0, -1));
//     let l = Number(splitHsl[2].slice(0, -1));
//     l /= 100;
//     const a = (s * Math.min(l, 1 - l)) / 100;
//     const f = (n: number) => {
//       const k = (n + h / 30) % 12;
//       const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
//       return Math.round(255 * color)
//         .toString(16)
//         .padStart(2, "0"); // convert to Hex and prefix "0" if needed
//     };
//     return `#${f(0)}${f(8)}${f(4)}`;
//   }
//   -----------------------------------------------
//   const daisyHEX = hslToHex(hVal, sVal, lVal);
//   const baseColor = harmony(daisyHEX)?.accent;
//   -----------------------------------------------
//   function paletteGenerator(hexVal: string) {
//     let baseColor = hexVal;
//     const paletteArr = [];
//     for (let i = 0; i < 20; i++) {
//       const nextColor = harmony(baseColor);
//       baseColor = nextColor.accent;
//       paletteArr.push(nextColor.accent);
//     }
//     return paletteArr;
//   }
