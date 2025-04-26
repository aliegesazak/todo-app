// Elementler
const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const reminderInput = document.getElementById('task-reminder');
const list = document.getElementById('task-list');
const themeBtn = document.getElementById('theme-btn');
const resetBtn = document.getElementById('reset-btn');

// Veriler
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Tema ayarı
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  save();
});
window.addEventListener('load', () => {
  if (localStorage.getItem('tasks')) tasks = JSON.parse(localStorage.getItem('tasks'));
  if (document.body.classList.contains('dark')) themeBtn.textContent = 'Açık Tema';
  render();
});

// Sıfırla
resetBtn.addEventListener('click', () => {
  if (confirm('Tüm görevleri silmek istediğine emin misin?')) {
    tasks = [];
    save(); render();
  }
});

// Görev ekleme
form.addEventListener('submit', e => {
  e.preventDefault();
  try {
    const text = input.value.trim();
    if (!text) throw new Error('Görev boş olamaz!');
    const rem = reminderInput.value ? new Date(reminderInput.value).getTime() : null;

    tasks.push({
      id: Date.now(),
      text, 
      createdAt: Date.now(),
      reminder: rem,
      completedAt: null,
      hasReminded: false
    });

    input.value = ''; reminderInput.value = '';
    save(); render();
  } catch (error) {
    alert(error.message);
  }
});

// Kaydet
function save() {
  try {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (e) {
    console.error('Veriler kaydedilemedi:', e);
    alert('Bir hata oluştu, veriler kaydedilemedi!');
  }
}

// Render Et
function render() {
  try {
    list.innerHTML = '';
    tasks
      .sort((a,b) => {
        if (a.reminder && b.reminder) return a.reminder - b.reminder;
        return a.createdAt - b.createdAt;
      })
      .forEach(task => {
        const li = document.createElement('li');

        // Metin / Düzenleme
        const span = document.createElement('span');
        span.className = 'task-text';
        if (task.editing) {
          const inp = document.createElement('input');
          inp.value = task.text;
          inp.addEventListener('keydown', ev => {
            if (ev.key === 'Enter') {
              task.text = ev.target.value.trim() || task.text;
              task.editing = false;
              save(); render();
            }
          });
          inp.addEventListener('blur', () => {
            task.text = inp.value.trim() || task.text;
            task.editing = false;
            save(); render();
          });
          span.classList.add('editing');
          span.appendChild(inp);
          inp.focus();
        } else {
          span.textContent = task.text;
          span.addEventListener('click', () => {
            task.editing = true;
            render();
          });
        }
        li.appendChild(span);

        // Sayacı
        const cd = document.createElement('div');
        cd.className = 'countdown';
        if (task.reminder && !task.completedAt) {
          const left = task.reminder - Date.now();
          if (left <= 0 && !task.hasReminded) {
            // Hatırlatma
            task.hasReminded = true; save();
            const ok = confirm(`Hatırlatıcı: "${task.text}" bitti mi?`);
            if (ok) markComplete(task.id);
            else {
              // 10 dk yerine geriye doğru sayma başlat
              task.reminder = Date.now() + 10 * 60 * 1000;
              task.hasReminded = false;
              save();
            }
          }
          const sec = Math.max(0, Math.floor(left / 1000) % 60);
          const min = Math.floor(left / 60000) % 60;
          const hr = Math.floor(left / 3600000);
          cd.textContent = `${hr}h ${min}m ${sec}s`;
          if (left < 5 * 60 * 1000) cd.classList.add('red');
          else if (left < 60 * 60 * 1000) cd.classList.add('yellow');
          else cd.classList.add('green');
        }
        li.appendChild(cd);

        // Buton grubu
        const btns = document.createElement('div');
        btns.className = 'btn-group';

        const done = document.createElement('button');
        done.textContent = 'Tamamla';
        done.disabled = !!task.completedAt;
        done.addEventListener('click', () => {
          if (confirm('Bu görevi tamamladığına emin misin?')) {
            markComplete(task.id);
          }
        });
        btns.appendChild(done);

        const del = document.createElement('button');
        del.textContent = 'Sil';
        del.className = 'delete';
        del.addEventListener('click', () => {
          try {
            if (confirm('Bu görevi silmek istediğine emin misin?')) {
              tasks = tasks.filter(t => t.id !== task.id);
              save(); render();
            }
          } catch (e) {
            console.error('Görev silme sırasında hata oluştu:', e);
            alert('Bir hata oluştu, görev silinemedi!');
          }
        });
        btns.appendChild(del);

        li.appendChild(btns);

        list.appendChild(li);
      });
  } catch (e) {
    console.error('Render işlemi sırasında hata oluştu:', e);
    alert('Bir hata oluştu, görevler görüntülenemedi!');
  }
}

// Görev tamamlama
function markComplete(id) {
  const task = tasks.find(t => t.id === id);
  if (!task.completedAt) {
    task.completedAt = Date.now();
    if (task.reminder) {
      const anaSure = task.reminder - task.createdAt;
      const ekstraSure = task.completedAt - task.reminder;

      function formatSure(ms) {
        const saat = Math.floor(Math.abs(ms) / 3600000);
        const dakika = Math.floor((Math.abs(ms) % 3600000) / 60000);
        const saniye = Math.floor((Math.abs(ms) % 60000) / 1000);
        return `${saat} saat ${dakika} dakika ${saniye} saniye`;
      }

      alert(`Görevin ana süresi ${formatSure(anaSure)} idi, ancak üstüne ${formatSure(ekstraSure)} ekleyerek tamamladın.`);
    }
    save();
    render();
  }
}

// 1 saniyede bir güncelle
setInterval(() => {
  try {
    render();
  } catch (e) {
    console.error('Güncelleme sırasında hata oluştu:', e);
    alert('Bir hata oluştu, görevler güncellenemedi!');
  }
}, 1000);

// Mobil uyum için resize
window.addEventListener('resize', () => {
  document.body.classList.toggle('mobile', window.innerWidth < 500);
});