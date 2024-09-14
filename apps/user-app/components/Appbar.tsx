"use client";
export default function Appbar() {
  return (
    <div className="flex flex-row pt-5 pl-10">
      <div className="bg-white text-5xl text-blue-500 font-extrabold">
        Paytm
      </div>
      <div className="flex flex-row justify-evenly w-full">
        <div>Send & recieve</div>
        <div>Pay with paytm</div>
        <div>paytm for business</div>
        <div>help center</div>
        <div>Log in</div>
      </div>
    </div>
  );
}
