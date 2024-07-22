import Router from "next/router";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import useRequest from "../../hooks/use-request";

const Ordershow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  const [errors, doRequest] = useRequest({
    url: "/api/payments",
    method: "post",
    body: {
      orderId: order.id,
    },
    onSuccess: () => Router.push("/orders"),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => clearInterval(timerId);
  }, []);

  if (timeLeft < 0) return <div>Order Expired</div>;
  return (
    <div>
      Time left to pay: {timeLeft} seconds.
      <StripeCheckout
        token={({ id }) => doRequest({ token: id })}
        stripeKey="pk_test_51Pax3YRxaK2GYVtewUxh9yCNaynezAPXakQPJWJwpJMSUVLmTzYdhAQNAQfgobwzdiRBeAyjL523ypQAQqnXOiMN00KSw8juR0"
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
      {errors}
    </div>
  );
};

Ordershow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);
  console.log("orders---", data);
  return { order: data };
};
export default Ordershow;
