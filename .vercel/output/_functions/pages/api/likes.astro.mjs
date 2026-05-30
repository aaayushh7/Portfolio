import { MongoClient } from 'mongodb';
import 'dotenv/config';
export { renderers } from '../../renderers.mjs';

const uri = process.env.MONGODB_URI || "mongodb+srv://aayushtiwari071:QzpHsoUyhEKlsSli@cluster0.jofgoyw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5e3,
  socketTimeoutMS: 45e3,
  connectTimeoutMS: 1e4,
  retryWrites: true,
  retryReads: true
};
let client;
let clientPromise;
if (process.env.NODE_ENV === "development") {
  let globalWithMongo = global;
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}
clientPromise.catch((error) => {
  console.error("MongoDB connection error:", error);
});
const clientPromise$1 = clientPromise;

const prerender = false;
const GET = async () => {
  try {
    const client = await clientPromise$1;
    const db = client.db("portfolio");
    const likesCollection = db.collection("likes");
    const likesDoc = await likesCollection.findOne({ _id: "counter" });
    const likes = likesDoc ? likesDoc.likes : 0;
    return new Response(JSON.stringify({ likes }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (error) {
    console.error("Error in GET /api/likes:", error);
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
    }
    return new Response(JSON.stringify({ error: "Failed to fetch likes" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
};
const POST = async () => {
  try {
    const client = await clientPromise$1;
    const db = client.db("portfolio");
    const likesCollection = db.collection("likes");
    const result = await likesCollection.updateOne(
      { _id: "counter" },
      { $inc: { likes: 1 } },
      { upsert: true }
    );
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (error) {
    console.error("Error in POST /api/likes:", error);
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
    }
    return new Response(JSON.stringify({ error: "Failed to update likes" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
