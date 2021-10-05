import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { PencilAltIcon, SaveAsIcon } from "@heroicons/react/solid";
import axios from "axios";

function Momo() {
  const [selectedMomo,setSelectedMomo] = useState('');
  const [vodafoneMomoStyle,setVodafoneMomoStyle] = useState('');
  const [tigoMomoStyle,setTigoMomoStyle] = useState('');
  const [mtnMomoStyle,setMtnMomoStyle] = useState('');
  const [transData,setTransData]  = useState('')

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const onButtonClick = async (e) => {

    if(selectedMomo == ''){
      alert('Select Mobile Money Vendor')
      return
    }

    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const message = messageRef.current.value;

    let paymentReceivedUrl = "http://localhost:3000/api/payment";

    await axios({
        method: "post",
        url: paymentReceivedUrl,
        data: {
          name: name,
          email: email,
          message: message,
          vendor: selectedMomo.toUpperCase()
        },
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          //'Authorization': 'Bearer '+token
        },
        //headers: {'Content-Type': 'multipart/form-data' }
      })
      .then(function (response) {
        setTransData(response)
        //console.log(transData);
      })
      .catch((error) => {
        console.log("=== error ===");
        console.log(error);
      });

    emailRef.current.value = "";
    messageRef.current.value = "";
    nameRef.current.value = "";
  };

  
  function setSelectedMomoBtn(momo){
    setSelectedMomo(momo)
    switch (momo) {
      case 'Vodafone':
        setVodafoneMomoStyle("bg-red-100 shadow-xl")
        setTigoMomoStyle("")
        setMtnMomoStyle("")
        break;
      case 'AirtelTigo':
        setTigoMomoStyle("bg-blue-100 shadow-xl")
        setMtnMomoStyle("")
        setVodafoneMomoStyle("")
        break;
      case 'MTN':
        setMtnMomoStyle("bg-yellow-100 shadow-xl")
        setTigoMomoStyle("")
        setVodafoneMomoStyle("")
        break;
      default:
        setVodafoneMomoStyle("")
        setTigoMomoStyle("")
        setMtnMomoStyle("")
        break;
    }
  }

  return (
    <div>
      <div className="" data-aos="zoom-in-up">
        <h1 className="py-3 text-2xl font-bold">
          Mobile Money Donation
        </h1>
        <div className="flex justify-between p-3 mb-3">
          <div onClick={() => setSelectedMomoBtn('Vodafone')} className={`flex-row px-3 duration-700 rounded-lg cursor-pointer hover:bg-gray-100 active:scale-90 hover:shadow-xl  ${vodafoneMomoStyle}`} style={{textAlign: 'center'}}>
            <div>
              <Image
                className="rounded-full"
                src="/assets/vodafone.png"
                objectFit="cover"
                objectPosition="center"
                width="100"
                height="100"
              />
              <div className="mt-1">Vodafone</div>
            </div>
          </div>
          <div onClick={() => setSelectedMomoBtn('AirtelTigo')} className={`flex-row px-3 duration-700 rounded-lg cursor-pointer hover:bg-gray-100 active:scale-90 hover:shadow-xl  ${tigoMomoStyle}`} style={{textAlign: 'center'}}>
            <div>
              <Image
                className="rounded-full"
                src="/assets/tigo.jpeg"
                // layout="fill"
                objectFit="cover"
                objectPosition="center"
                width="100"
                height="100"
              />
            </div>
            <div className="mt-1">AirtelTigo</div>
          </div>
          <div onClick={() => setSelectedMomoBtn('MTN')} className={`flex-row px-3 duration-700 rounded-lg cursor-pointer hover:bg-gray-100 active:scale-90 hover:shadow-xl  ${mtnMomoStyle}`} style={{textAlign: 'center'}}>
            <div>
              <Image
                className="rounded-full"
                src="/assets/mtn.jpeg"
                // layout="fill"
                objectFit="cover"
                objectPosition="center"
                width="100"
                height="100"
              />
            </div>
            <div className="mt-1">MTN</div>
          </div>
          
        </div>

        {/* form */}
        <div className="w-full">
          {transData != '' ? (
            <div  className="p-3 mb-3 text-yellow-700 bg-yellow-300 rounded-lg">
              <div className="flex justify-between">
                <di>Message:</di>
                <di>{transData.data.reason}</di>
              </div>
              <div className="flex justify-between">
                <di>Date:</di>
                <di>{transData.data.statusdate}</di>
              </div>
              <div className="flex justify-between">
                <di>Transaction ID:</di>
                <di>{transData.data.transactionid}</di>
              </div>
            </div>
          ):(
            <div></div>
          )}
          <div className={`flex inline-block p-2 text-sm font-bold text-white bg-red-400 rounded-lg`}>
            <PencilAltIcon className="h-6" />
            <span>Enter <span className="text-xl text-black text-white">{selectedMomo}</span> MOMO Details</span>
          </div>
          <div className="ml-[-.5em] pr-2">
            <input
              ref={nameRef}
              placeholder="Enter MoMo Number"
              type="text"
              className="w-full p-2 mx-2 my-3 border-2 rounded-lg"
            />
            <br />
            <input
              ref={emailRef}
              placeholder="Enter Amount"
              type="text"
              className="w-full p-2 mx-2 my-3 border-2 rounded-lg"
            />
            <br />
            {/* <textarea
              rols="4"
              placeholder="Message"
              cols="30"
              ref={messageRef}
              type="text"
              className="w-full p-2 mx-2 my-3 border-2 rounded-lg"
            /> */}
            <select className="w-full p-3 mx-2 my-3 text-gray-500 border-2 rounded-lg focus:outline-none" ref={messageRef}>
                    <option>Select Payment Type</option>
                    <option>Tithe</option>
                    <option>Mission</option>
                    <option>Needy Fund</option>
                  </select>
            <br />

            <button
              className="p-2 mx-2 text-white bg-green-400 rounded-lg shadow-md hover:bg-green-200 active:scale-90 hover:shadow-xl"
              onClick={onButtonClick}
            >
              <div className="flex">
                <SaveAsIcon className="h-6" />
                <span>Donate</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}





export default Momo;
