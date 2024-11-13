export function MainCard({ title, subtitle, link, linkTitle }) {
  const colors = ["blue", "purple", "sky", "emerald", "green", "amber", "lime", "violet", "fuchsia"];
  const choosedColor = colors[Math.floor(Math.random() * colors.length)];

  const gradientClasses = {
    blue: "from-blue-800 to-blue-700",
    purple: "from-purple-800 to-purple-700",
    sky: "from-sky-500 to-sky-400",
    emerald: "from-emerald-500 to-emerald-400",
    green: "from-green-500 to-green-400",
    amber: "from-amber-500 to-amber-400",
    lime: "from-lime-500 to-lime-400",
    violet: "from-violet-800 to-violet-700",
    fuchsia: "from-fuchsia-800 to-fuchsia-700",
  };
  return (
    <div class="min-w-40 max-w-sm grow shrink bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
      <div className={`w-full min-h-32 bg-gradient-to-br ${gradientClasses[choosedColor]} ${gradientClasses[choosedColor]} rounded`}></div>
      <div class="p-5">
        <a href="#">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{subtitle}</p>
        <a
          href={link}
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {linkTitle}
          <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </a>
      </div>
    </div>
  );
}
export function LiteCard({ title, subtitle, link, linkTitle }) {
  const colors = ["blue", "purple", "sky", "emerald", "green", "amber", "lime", "violet", "fuchsia"];
  const choosedColor = colors[Math.floor(Math.random() * colors.length)];

  const gradientClasses = {
    blue: "from-blue-800 to-blue-700",
    purple: "from-purple-800 to-purple-700",
    sky: "from-sky-500 to-sky-400",
    emerald: "from-emerald-500 to-emerald-400",
    green: "from-green-500 to-green-400",
    amber: "from-amber-500 to-amber-400",
    lime: "from-lime-500 to-lime-400",
    violet: "from-violet-800 to-violet-700",
    fuchsia: "from-fuchsia-800 to-fuchsia-700",
  };

  return (
    <div class="min-w-40 max-w-sm grow shrink bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className={`w-full min-h-32 bg-gradient-to-br ${gradientClasses[choosedColor]} ${gradientClasses[choosedColor]} rounded`}></div>
      <div class="p-5">
        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{subtitle}</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{title.length > 40 ? `${title.slice(0, 35)}..` : title}</p>
        <a
          href={link}
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {linkTitle}
          <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </a>
      </div>
    </div>
  );
}
