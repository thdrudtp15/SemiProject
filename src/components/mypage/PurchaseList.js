import OrderCard from "./OrderCard";

const PurchaseList = () => {
  return (
    <>
      <div className="header_box">
        <h3 className="header">구매 내역</h3>
      </div>
      <div className="purchase_list_box">
        <OrderCard />
      </div>
    </>
  );
};

export default PurchaseList;
