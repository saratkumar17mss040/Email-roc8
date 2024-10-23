import EmailCard from "./EmailCard";

export default function EmailList({ emailList, onEmailClick }) {
  if (emailList.length === 0) {
    return (
      <div className="cursor-pointer flex-1" onClick={onEmailClick}>
        <p>No emails found</p>
      </div>
    );
  }
  return (
    <div className="m-4 cursor-pointer flex-1 w-full" onClick={onEmailClick}>
      <ul className="flex flex-col gap-4">
        {emailList.map((email) => (
          <EmailCard key={email.id} email={email} />
        ))}
      </ul>
    </div>
  );
}
