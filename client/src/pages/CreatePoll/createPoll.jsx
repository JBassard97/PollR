import "./createPoll.css";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_POLL } from "../../utils/mutations";
import Auth from "../../utils/auth";
import "./createPoll.css"

export default function CreatePoll() {
  const [formState, setFormState] = useState({
    header: "",
    description: "",
    choice1: "",
    choice2: "",
    choice3: "",
    choice4: "",
    choice5: "",
    choice6: "",
    choice7: "",
    choice8: "",
  });
  const [createPoll, { error, data }] = useMutation(CREATE_POLL);

  //Formats the formState for Mutation
  const formatMutation = (formState) => {
    const mutationFormat = {
      header: formState.header,
      description: formState.description,
      choices: [],
    };

    // Loop through formState to extract choices
    for (let i = 1; i <= 8; i++) {
      const choiceKey = `choice${i}`;
      if (formState[choiceKey]) {
        mutationFormat.choices.push({ text: formState[choiceKey] });
      }
    }

    return mutationFormat;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const createPollInput = formatMutation(formState);

    try {
      const { data } = await createPoll({
        variables: { input: createPollInput },
      });

      window.location.reload();
    } catch (e) {
      console.error(e);
    }

    // Clear form data
    setFormState({
      header: "",
      description: "",
      choice1: "",
      choice2: "",
      choice3: "",
      choice4: "",
      choice5: "",
      choice6: "",
      choice7: "",
      choice8: "",
    });
  };

  return (
    <main>
      {Auth.loggedIn() ? (
        <>
          <h2 className="p-4 m-2">Create a Poll</h2>
          <form onSubmit={handleFormSubmit} className="p-4">
            <div className="form-group row p-2">
              <label className="col-sm-2 col-form-label">Title: </label>
              <div className="col-sm-8">
                <input
                  placeholder="Poll Title"
                  type="text"
                  id="titleInput"
                  className="form-control bg-dark text-light"
                  name="header"
                  value={formState.header}
                  onChange={handleChange}
                  maxLength={15}
                  required
                ></input>
              </div>
            </div>
            <div className="form-group row p-2">
              <label className="col-sm-2 col-form-label">Description: </label>
              <div className="col-sm-8">
                <input
                  placeholder="Brief poll description (Optional)"
                  type="text"
                  id="descriptionInput"
                  className="form-control bg-dark text-light"
                  name="description"
                  value={formState.description}
                  onChange={handleChange}
                  maxLength={25}
                ></input>
              </div>
            </div>
            <div className="form-group row p-2">
              <label className="col-sm-2 col-form-label">{`Choices: At least 2 choices required`}</label>
              <div className="col-sm-8">
                <input
                  placeholder="Choice 1"
                  type="text"
                  id="descriptionInput"
                  className="form-control bg-dark text-light"
                  name="choice1"
                  value={formState.choice1}
                  onChange={handleChange}
                  maxLength={15}
                ></input>
                <input
                  placeholder="Choice 2"
                  type="text"
                  id="descriptionInput"
                  className="form-control bg-dark text-light"
                  name="choice2"
                  value={formState.choice2}
                  onChange={handleChange}
                  maxLength={15}
                ></input>
                <input
                  placeholder="Choice 3"
                  type="text"
                  id="descriptionInput"
                  className="form-control bg-dark text-light"
                  name="choice3"
                  value={formState.choice3}
                  onChange={handleChange}
                  maxLength={15}
                ></input>
                <input
                  placeholder="Choice 4"
                  type="text"
                  id="descriptionInput"
                  className="form-control bg-dark text-light"
                  name="choice4"
                  value={formState.choice4}
                  onChange={handleChange}
                  maxLength={15}
                ></input>
                <input
                  placeholder="Choice 5"
                  type="text"
                  id="descriptionInput"
                  className="form-control bg-dark text-light"
                  name="choice5"
                  value={formState.choice5}
                  onChange={handleChange}
                  maxLength={15}
                ></input>
                <input
                  placeholder="Choice 6"
                  type="text"
                  id="descriptionInput"
                  className="form-control bg-dark text-light"
                  name="choice6"
                  value={formState.choice6}
                  onChange={handleChange}
                  maxLength={15}
                ></input>
                <input
                  placeholder="Choice 7"
                  type="text"
                  id="descriptionInput"
                  className="form-control bg-dark text-light"
                  name="choice7"
                  value={formState.choice7}
                  onChange={handleChange}
                  maxLength={15}
                ></input>
                <input
                  placeholder="Choice 8"
                  type="text"
                  id="descriptionInput"
                  className="form-control bg-dark text-light"
                  name="choice8"
                  value={formState.choice8}
                  onChange={handleChange}
                  maxLength={15}
                ></input>
              </div>
            </div>
            <div className="submitBtn">
              <button className="bg-dark text-light p-3 m-2" type="submit">
                Create Poll
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <h2>Login to Create a Poll</h2>
        </>
      )}
    </main>
  );
}
