import { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
function Details() {
  const router = useRouter();
  const id = router.query.sermonId;

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
 
  const onButtonClick = (e) => { 
    e.preventDefault()
      const name = nameRef.current.value
      const email = emailRef.current.value
      const message = messageRef.current.value
      const userData = [
        name,email,message
      ]
      console.log('=======');
    console.log(userData)

    emailRef.current.focus()
  }

  return (
    <div>
      <Link href="/sermons">Back</Link>
      <h1 className="text-4xl">This is sermon detail</h1>
      <p>{id}</p>

      <h1>Leave a Comment</h1>
      <div>
        <form>
          <input ref={nameRef} type="text" className="p-2 mx-2 my-3 border-2 rounded-lg" />
          <br/>
          <input ref={emailRef} type="text" className="p-2 mx-2 my-3 border-2 rounded-lg" />
          <br/>
          <textarea rols="4" cols="30" ref={messageRef} type="text" className="p-2 mx-2 my-3 border-2 rounded-lg" />
          <br/>
          <button className="p-2 mx-2 bg-yellow-400 hover:shadow-lg hover:bg-yellow-100" onClick={onButtonClick}>Save work</button>
        </form>
      </div>
    </div>
  );
}

export default Details;
