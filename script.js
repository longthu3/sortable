document.querySelectorAll('.drag-area li').forEach(item => {
    item.addEventListener('dragstart', function (e) {
        e.dataTransfer.setData('text', e.target.id);
        this.classList.add('dragging');
    });

    item.addEventListener('dragend', function () {
        this.classList.remove('dragging');
    });
});

document.querySelectorAll('.drag-area').forEach(area => {
    area.addEventListener('dragover', function (e) {
        e.preventDefault();
        const afterElement = getDragAfterElement(area, e.clientY);
        const draggable = document.querySelector('.dragging');
        if (afterElement == null) {
            area.appendChild(draggable);
        } else {
            area.insertBefore(draggable, afterElement);
        }
    });
});

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('li:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}
