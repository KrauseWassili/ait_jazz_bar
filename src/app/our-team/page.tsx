export default function OurTeam() {
  const team = [
    {
      title: "Team Leader",
      name: "Wassili Krause",
      description:
        "Wassili leads the engineering team, sets technical direction, and coordinates delivery. Enjoys system architecture, mentoring engineers, and aligning product goals with engineering priorities.",
    },
    {
      title: "Programmer 1",
      name: "Alexej Luja",
      description:
        "Alexej specializes in modern frontend development (React, TypeScript, component design). Focused on UX, performance, and building reusable UI systems.",
    },
    {
      title: "Programmer 2",
      name: "Natalia Fedorenko",
      description:
        "Natalia builds and maintains APIs, databases, and server-side systems. Experienced with scalable architectures, testing, and observability.",
    },
    {
      title: "Programmer 3",
      name: "Ruslana Sopiadis",
      description:
        "Ruslana works across the stack: shipping features from prototype to production. Loves automation, developer tooling, and improving deployment velocity.",
    },
  ];

  return (
    <div className="p-4 min-h-screen">
      <h1 className="text-4xl font-bold mb-10 text-gray-800 text-center">
        The People Behind the Code
      </h1>
      <p className="text-center text-lg text-gray-700 mb-12 opacity-90">
        Meet the people building the product — a compact, focused engineering team.
      </p>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 place-items-center">
        {team.map((member) => (
          <li key={member.name} className="flex justify-center items-stretch w-full">
            <div className="flex flex-col bg-[#f9f4ec] ring-1 ring-gray-200 shadow hover:shadow-lg transition-shadow p-8 w-[320px] min-h-[330px] text-center">
              <h3 className="italic text-amber-700 text-base mb-1">{member.title}</h3>
              <p className="font-bold text-lg mb-2 text-gray-900">{member.name}</p>
              <p className="text-gray-700 opacity-90 text-sm">{member.description}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-14 text-center">
        <p className="text-xl text-gray-700 font-semibold">
          Bold minds. Smart code. Real impact.
        </p>
      </div>
    </div>
  );
}
