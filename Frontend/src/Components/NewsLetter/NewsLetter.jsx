import "../NewsLetter/NewsLetter.css";
const NewsLetter = () => {
  return (
    <>
      <div className="newsletter-outer">
        <div className="newsletter">
          <h1>Get Exclusive Offers On Your Email</h1>
          <p>Subscribe to our news letter and stay Updated</p>
          <div>
            <input type="email" placeholder="Enter your Email Id" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsLetter;
