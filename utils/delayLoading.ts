// Code for delaying data - to show loading.tsx
// --------------------------------------------------------------
export default async function delayLoading() {
  let myPromise = new Promise(function (myResolve) {
    setTimeout(function () {
      myResolve("I love You !!");
    }, 3000);
  });
  let myPromiseResolved = await myPromise;
  console.log(myPromiseResolved);
  return myPromiseResolved;
}
