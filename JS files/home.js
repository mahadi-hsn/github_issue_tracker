const allButton = document.querySelectorAll(".button");
allButton.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".active")?.classList.remove("active");
    btn.classList.add("active");
  });
});

const gerPriorityClass = (priority) => {
  if (priority === "low") {
    return "bg-gray-200 text-gray-500";
  } else if (priority === "medium") {
    return "bg-yellow-100 text-yellow-500";
  } else {
    return "bg-red-100 text-red-500";
  }
};

// Fetching all issues
const loadAllIssues = async () => {
  const response = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  loading();
  const data = await response.json();
  loadingStop();
  displayAllIssues(data.data);
};
loadAllIssues();

const displayAllIssues = (issues) => {
  const issueContainer = document.getElementById("issueContainer");
  issueContainer.innerHTML = "";
  const totalIssues = document.getElementById("totalIssues");
  totalIssues.innerText = issues.length;
  const getStatusColor = (status) => {
    if (status === "closed") {
      return "border-t-4 border-purple-500";
    } else if (status === "open") {
      return "border-t-4 border-green-500";
    }
  };
  issues.forEach((issue) => {

    const issueCard = document.createElement("div");
    issueCard.className = `bg-white rounded-xl shadow-md overflow-hidden ${getStatusColor(issue.status)}`;
    issueCard.innerHTML = `
                        <div onclick="openModal(${issue.id})" class="p-6 h-[75%]">

                            <div class="flex justify-between items-center mb-4">

                                <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                    <div class="w-6 h-6 border-4 border-green-500 border-dashed rounded-full"></div>
                                </div>

                                <span id="priority" class="px-5 py-1 rounded-full ${gerPriorityClass(issue.priority)} font-semibold">
                                    ${issue.priority}
                                </span>

                            </div>

                            <p class="text-xl font-bold text-gray-800 line-clamp-1">
                                ${issue.title}
                            </p>

                            <p class="text-gray-500 mt-3 text-base line-clamp-2">
                                ${issue.description}
                            </p>

                            <div class="flex gap-2 mt-5">

                                <span
                                    class="flex items-center gap-2 px-4  rounded-full border border-red-300 text-red-500 font-normal">
                                    ${issue.labels[0] ? issue.labels[0].toUpperCase() : "UNDEFINED"}
                                </span>

                                <span
                                    class="flex items-center gap-2 px-4  rounded-full border border-yellow-400 text-yellow-600 font-normal">
                                    ${issue.labels[1] ? issue.labels[1].toUpperCase() : "UNDEFINED"}
                                </span>

                            </div>

                        </div>

                        <div class="bg-gray-100 px-6 py-4 border-t">

                            <p class="text-gray-500 text-lg">${issue.author}</p>
                            <p class="text-gray-400 mt-2">${issue.createdAt}</p>

                        </div>
      `;
    issueContainer.append(issueCard);

  });
};

// Fetching single issue data
const openModal = async (id) => {
  console.log(id);
  const response = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
  );
  const data = await response.json();
  displayModal(data.data);
};

const displayModal = (issue) => {
  console.log(issue);
  const modal = document.getElementById("issueModal");
  const getStatusColor = (status) => {
    if (status === "closed") {
      return "bg-purple-500 rounded-full px-5 text-white py-1";
    } else if (status === "open") {
      return "bg-green-500 rounded-full px-5 text-white py-1";
    }
  };
  modal.innerHTML = `
                        <div class="modal-box space-y-4">
                            <div class='space-y-2'>
                                <h3 class="text-lg font-bold">${issue.title}</h3>
                                <div class="flex items-center gap-2 text-sm font-medium">
                                  <span class="${getStatusColor(issue.status)}">
                                    ${issue.status.toUpperCase()}
                                  </span>

                                  <span class="text-gray-400">•</span>

                                  <span class="text-gray-600">
                                    Opened by <span class="font-semibold text-gray-800">${issue.author}</span>
                                  </span>

                                  <span class="text-gray-400">•</span>

                                  <span class="text-gray-500">
                                    ${issue.createdAt}
                                  </span>
                                </div>
                            </div>
                            <div class="flex gap-2 mt-5">

                                <span
                                    class="flex items-center gap-2 px-4  rounded-full border border-red-300 text-red-500 font-normal">
                                    ${issue.labels[0] ? issue.labels[0].toUpperCase() : "UNDEFINED"}
                                </span>

                                <span
                                    class="flex items-center gap-2 px-4  rounded-full border border-yellow-400 text-yellow-600 font-normal">
                                    ${issue.labels[1] ? issue.labels[1].toUpperCase() : "UNDEFINED"}
                                </span>

                            </div>
                            <p class="py-4">${issue.description}</p>
                            <div class="flex justify-between items-center bg-gray-100 p-4 rounded-md">
                            <p class="font-semibold">Assignee: <span class="font-normal">${issue.assignee ? issue.assignee : "Not assigned yet"}</span></p>
                                <p class="font-semibold">Priority: <span class="${gerPriorityClass(issue.priority)} px-4 py-1 rounded-full">${issue.priority.toUpperCase()}</span></p>
                            </div>
                            <div class="modal-action">
                                <form method="dialog">
                                    <button class="btn btn-primary">Close</button>
                                </form>
                            </div>
                        </div>
                    `;
  modal.showModal();
};

const loadIssues = async (status) => {
  const response = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  loading();
  const data = await response.json();
  loadingStop();
  
  let filteredIssue;

  if(status === 'all'){
    filteredIssue = data.data;
  }
  else{
    filteredIssue = data.data.filter(issue => issue.status.toLowerCase() === status.toLowerCase());
  }
  displayAllIssues(filteredIssue);
};

const loading = () => {
  const loading = document.getElementById("loading");
  loading.classList.remove("hidden");
}

const loadingStop = () => {
  const loading = document.getElementById("loading");
  loading.classList.add("hidden");
}


document.getElementById('searchBtn').addEventListener('click', () => {
  const search = document.getElementById('search').value;
  search.trim().toLowerCase();
  console.log(search);
  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${search}`)
  .then(res => res.json())
  .then(data => {
    const filteredIssue = data.data;
    filteredIssue.filter(issue => issue.title.toLowerCase().includes(search.toLowerCase()));
    displayAllIssues(filteredIssue);
  })
})