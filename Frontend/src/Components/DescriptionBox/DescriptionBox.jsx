import "../DescriptionBox/DescriptionBox.css";

const DescriptionBox = () => {
  return (
    <>
      <div className="descriptionbox-outer">
        <div className="descriptionbox">
          <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade">Reviews (122)</div>
          </div>
          <div className="descriptionbox-description">
            <p>
              ShopSphere is a modern shopping app that simplifies the way people
              buy and sell products online. It provides a seamless platform
              where businesses and individuals can showcase their items, connect
              with customers, and complete transactions securely and
              efficiently. With its user-friendly design, wide product range,
              and convenient features, ShopSphere brings the entire marketplace
              to your fingertips, offering accessibility, reliability, and a
              truly global shopping experience.
            </p>
            <p>
              Whether you're looking for the latest trends, exclusive deals, or
              everyday essentials, ShopSphere makes shopping effortless and
              enjoyable. Its advanced search, secure payment options, and
              personalized recommendations ensure that every customer finds
              exactly what they need with confidence and ease.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DescriptionBox;
