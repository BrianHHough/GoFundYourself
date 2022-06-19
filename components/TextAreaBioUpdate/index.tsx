import React from 'react'
import Moralis, { useMoralis } from "react-moralis";

const TextAreaBioUpdate = ({ rows, cols, value, limit }) => {
  const [content, setContent] = React.useState(value.slice(0, limit));

  const setFormattedContent = React.useCallback(
    text => {
      setContent(text.slice(0, limit));
    },
    [limit, setContent]
  );

  const { user } = useMoralis();

  const onSubmitBio = async (e) => {

    // Mapping to Moralis server
    // varaible here -> variable in moralis _User
    // content -> profileBio
        e.preventDefault();
        const bio: string = content;
        // @ts-ignore
        user?.set("profileBio", bio);

        await user?.save();
        // @ts-ignore
        document.getElementById("submitBioButton").childNodes[0].nodeValue="Submitted... Go to next step!"
    };

  React.useEffect(() => {
    setFormattedContent(content);
  }, []);

  return (
    <>
      <div className="flex w-screen h-screen items-center justify-center">
      <form onSubmit={onSubmitBio}>
        <textarea
          rows={rows}
          cols={cols}
          onChange={event => setFormattedContent(event.target.value)}
          value={content}
        />
      <p>
        {content.length}/{limit}
      </p>

      <button 
          type="submit"
          id="submitBioButton"
          className="mt-5 w-full p-5 bg-green-700 text-white text-lg rounded-xl animate-pulse"
          >
          Submit
      </button>
      </form>
      </div>
    </>
  );
};

export default TextAreaBioUpdate
