// const uri = "../../../assets/joinUs.png";

// export default function JoinUs() {
//   return (
//     <div
//       style={{
//         background: `url(${uri}) no-repeat top center #f47e00`,
//         backgroundPosition: "1020px top",
//       }}
//     >
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">joinus</div>
//     </div>
//   );
// }
// import Image from "next/image";
// import joinUsImage from "@/assets/joinUs.png"; // Adjust path based on your project

export default function JoinUs() {
  return (
    <div
      style={{
        background: `url('/assets/joinUs.png') no-repeat top center #f47e00`,
        backgroundPosition: "1020px top",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sansita">
        <div className="shadow flex max-w-fit">
          <div
            style={{
              //   background:
              //     "url(/assets/con-bg.png) no-repeat center center / cover #f47e00",
              background:
                "url(/assets/con-bg.png) no-repeat top center / cover #f47e00",
              backgroundPosition: "-275px center",
            }}
            className="w-[70px] inline-block"
          ></div>
          <div className="inline-block bg-white ml-[-3px] px-[30px] py-[37px] w-[550px] min-h-[324px]">
            <h2 className="text-[#f48000] text-3xl md:text-[54px] font-bold tracking-[-3.30px]">
              <span className="text-black">Join Our</span> Food Squad!
            </h2>
            <h3 className="text-xl md:text-[30px] font-light pb-5 tracking-[-1px]">
              Suggest your favorite food delights<span></span>
            </h3>
            <p className="tracking-tighter mb-5 font-light">
              We respect your wisdom for food...
              <br />
              Share your best loved flavours of life with Taste Of City and we
              shall feature your treasured food trails.
            </p>
            <div>
              <a
                href="/addtaste"
                className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-white font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-lg font-sansita"
              >
                Suggest A Taste
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
