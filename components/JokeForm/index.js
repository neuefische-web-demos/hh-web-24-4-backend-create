import useSWR from "swr";

export default function JokeForm() {
  const { mutate } = useSWR("/api/jokes");

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const jokeData = Object.fromEntries(formData);

    const response = await fetch("/api/jokes", {
      method: "POST",
      body: JSON.stringify(jokeData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      mutate();
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="joke-input">Enter a new joke:</label>
      <input id="joke-input" type="text" name="joke" />
      <button type="submit">Submit</button>
    </form>
  );
}
