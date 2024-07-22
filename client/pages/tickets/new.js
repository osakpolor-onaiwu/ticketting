import { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

const NewTicket = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const onBlur = () => {
    const value = parseFloat(price);
    if (!isNaN(value) && value > 0) {
      setPrice(value.toFixed(2));
    } else {
      return;
    }
  };

    const [errors, doRequest] = useRequest({
      url: "/api/tickets",
      method: "post",
      body: {
        title,
        price,
      },
      onSuccess: () => Router.push('/'),
    });

    const onSubmit = async (e) => {
      e.preventDefault();
      await doRequest();
    };

  return (
    <div>
      <h1>Create a Ticket</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            value={price}
            type="text"
            onBlur={onBlur}
            onChange={(e) => setPrice(e.target.value)}
            className="form-control"
          />
        </div>

        {errors}
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default NewTicket;
