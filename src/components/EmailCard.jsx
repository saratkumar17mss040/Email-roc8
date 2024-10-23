import { formatDate } from "../utils";

export default function EmailCard({ email }) {
  return (
    <li
      className={`border rounded-md cursor-pointer ml-3 p-5 hover:border-pink-500 ${
        email.filters.isRead && "bg-gray-100"
      }`}
      id={email.id}
    >
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-full font-bold text-xl bg-pink-500 text-white text-center flex justify-center items-center">
          {email.from.name[0].toUpperCase()}
        </div>

        <div>
          <p>
            From email: <span className="font-bold">{email.from.email}</span>
          </p>
          <p>
            From name: <span className="font-bold"> {email.from.name}</span>
          </p>
          <p>
            Subject: <span className="font-bold">{email.subject}</span>
          </p>
          <p>{email.short_description}</p>
          <div className="flex">
            <p className="mr-2">{formatDate(email.date)}</p>
            <p className="text-pink-500">
              {email.filters.isFavorite && "Favorite"}{" "}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}
