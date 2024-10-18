import { useEmailContext } from "../context/EmailContext";

export default function EmailPagination({ totalEmailItems }) {
  // 10 items per page set up
  const totalPages = Math.ceil(totalEmailItems / 10);
  const { setPageNo } = useEmailContext();
  return (
    <div className="flex justify-center mt-4">
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            onClick={() => setPageNo(page)}
            key={page}
            className="flex justify-center items-center bg-pink-500 text-white rounded-full w-4 h-4 p-4 mr-2 text-center"
          >
            {page}
          </button>
        )
      )}
    </div>
  );
}
