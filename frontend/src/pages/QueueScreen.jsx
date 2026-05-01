function QueueScreen() {
  const [queue, setQueue] = useState([]);

  const loadQueue = async () => {
    const res = await API.get("/appointments/queue");
    setQueue(res.data);
  };

  useEffect(() => {
    loadQueue();
    const interval = setInterval(loadQueue, 5000);
    return () => clearInterval(interval);
  }, []);

  const current = queue.find(q => q.status === "Pending");

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl mb-5">Now Serving</h1>

      <h2 className="text-5xl text-blue-600">
        Token #{current?.token || "-"}
      </h2>

      <h3 className="mt-5 text-xl">Waiting List</h3>

      {queue
        .filter(q => q.status === "Pending")
        .map(q => (
          <p key={q._id}>#{q.token} - {q.patientId?.name}</p>
        ))}
    </div>
  );
}