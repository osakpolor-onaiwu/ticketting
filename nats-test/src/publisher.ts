import nats from "node-nats-streaming";
import { TicketCreatedPublisher } from "./events/ticket_created_publisher";
console.clear() 

const client = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

client.on("connect", async () => {
  console.log("Connected to NATS");
  const publisher = new TicketCreatedPublisher(client);
  try {
    await publisher.publish({
      id: "123",
      title: "concert",
      price: 20,
    });
  
  } catch (error) {
    console.error(error)
  }
  
})
