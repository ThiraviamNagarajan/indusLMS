import React from "react";

type Term = {
  name: string; // e.g. "Term 1"
};

type TableProps = {
  rows: string[];      // e.g. ["Writing Test", "Formative Assessment", "Stream", "SDL"]
  terms: Term[];       // e.g. [{ name: "Term 1" }, { name: "Term 2" }]
};

const Table: React.FC<TableProps> = ({ rows, terms }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300 text-sm text-gray-700">
        <thead>
          <tr>
            {/* Left header */}
            <th
              rowSpan={2}
              className="border border-gray-300 px-4 py-2 text-left bg-gray-100"
            >
              Assessment
            </th>

            {/* Dynamic terms */}
            {terms.map((term, idx) => (
              <th
                key={idx}
                colSpan={2}
                className="border border-gray-300 px-4 py-2 text-center bg-gray-50"
              >
                {term.name}
              </th>
            ))}
          </tr>

          <tr>
            {terms.map((_, idx) => (
              <React.Fragment key={idx}>
                <th className="border border-gray-300 px-4 py-2">Task</th>
                <th className="border border-gray-300 px-4 py-2">Avg</th>
              </React.Fragment>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, rIdx) => (
            <tr key={rIdx}>
              <td className="border border-gray-300 px-4 py-2 bg-gray-50">
                {row}
              </td>

              {terms.map((_, tIdx) => (
                <React.Fragment key={tIdx}>
                  <td className="border border-gray-300 px-4 py-2"></td>
                  <td className="border border-gray-300 px-4 py-2"></td>
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
