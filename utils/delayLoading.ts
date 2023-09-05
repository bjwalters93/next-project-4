// Code for delaying data - to show loading.tsx
// --------------------------------------------------------------
export default async function delayLoading(time: number) {
  let myPromise = new Promise(function (myResolve) {
    setTimeout(function () {
      myResolve("I love You !!");
    }, time);
  });
  let myPromiseResolved = await myPromise;
  console.log(myPromiseResolved);
  return myPromiseResolved;
}
