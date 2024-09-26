const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

const GetTheDate = () => {
  // Get the current date
  const currentDate = new Date();

  // Add 3 days to the current date
  const dateAfterThreeDays = new Date(currentDate);
  dateAfterThreeDays.setDate(currentDate.getDate() + 3);

  return (
    <div>
      <p>{`on or before ${formatDate(dateAfterThreeDays)}`}</p>
    </div>
  );
};

export default GetTheDate;
