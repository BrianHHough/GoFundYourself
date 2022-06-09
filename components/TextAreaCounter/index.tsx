import React from 'react'
import Moralis, { useMoralis } from "react-moralis";

const TextAreaCounter = ({ rows, cols, value, limit }) => {
  const [{ content, wordCount }, setContent] = React.useState({
    content: value,
    wordCount: 0
  });

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
    };

  const setFormattedContent = React.useCallback(
    text => {
      let words = text.split(' ').filter(Boolean);
      if (words.length > limit) {
        setContent({
          content: words.slice(0, limit).join(' '),
          wordCount: limit
        });
      } else {
        setContent({ content: text, wordCount: words.length });
      }
    },
    [limit, setContent]
  );

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
        {wordCount}/{limit}
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

export default TextAreaCounter