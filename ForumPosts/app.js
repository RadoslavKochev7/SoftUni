window.addEventListener("load", solve);

function solve() {
  const publishButton = document.getElementById('publish-btn');
  const reviewListItem = document.getElementById('review-list');
  const publishListItem = document.getElementById('published-list');
  const titleInput = document.getElementById('post-title');
  const categoryInput = document.getElementById('post-category');
  const contentTextArea = document.getElementById('post-content');
  const clearBtn = document.getElementById('clear-btn');

  let title, category, content;

  publishButton.addEventListener('click', handlePostsInfo);
  clearBtn.addEventListener('click', () => {
    publishListItem.remove()
  })

  function handlePostsInfo() {
    title = titleInput.value;
    category = categoryInput.value;
    content = contentTextArea.value;

    if (title && category && content) {
      reviewListItem.innerHTML += `
      <li class="rpost">
        <article>
          <h4>${title}</h4>
          <br>
          <p>Category: ${category}</p>
          <br>
          <p>Content: ${content}</p>
        </article>
        <button class="action-btn edit">Edit</button>
        <button class="action-btn approve">Approve</button>
      </li>`;

      titleInput.value = '';
      categoryInput.value = '';
      contentTextArea.value = '';

      const editBtn = document.querySelector('#review-list > li > button.action-btn.edit');
      const approveBtn = document.querySelector('.edit');

      editBtn.addEventListener('click', approveHandler);
      approveBtn.addEventListener('click', editHandler)
    }
  }

  function approveHandler() {
    this.parentNode.remove();
    publishListItem.innerHTML = `
    <li class="rpost">
        <article>
          <h4>${title}</h4>
          <p>Category: ${category}</p>
          <p>Content: ${content}</p>
        </article>
    </li>`;
  }

  function editHandler() {
    reviewListItem.innerHTML = '';
    titleInput.value = title;
    categoryInput.value = category;
    contentTextArea.value = content;
  }
}

solve()

