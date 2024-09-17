import "../styles/EllipsisSample.css";

const EllipsisSample = () => {
  return (
    <div className="product-card">
      <img
        src="https://storage.googleapis.com/shy-pub/41613/SKU-4725_0-1726207751419.jpg"
        alt="Dispencer"
        className="product-image"
      />
      <div className="product-info">
        <span className="discount-tag">44% off</span>
        <h3 className="truncate-text">
          Glass Oil Dispencer bdbababc auhcacacaocac oucidabcibic
        </h3>
        <p>
          ₹281 <span className="original-price">₹499</span>
        </p>
        <button className="add-to-cart">+ Add</button>
      </div>
    </div>
  );
};

export default EllipsisSample;
