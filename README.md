# To-Do List Uygulaması

Bu proje, kullanıcıların görevlerini ekleyip, düzenleyip ve tamamlayabileceği basit bir To-Do List uygulamasıdır. Uygulama, HTML, CSS ve JavaScript kullanılarak geliştirilmiştir. Ayrıca, görevlerin hatırlatıcılı olma özelliği ile kullanıcılar belirledikleri tarihe kadar hatırlatmalar alabilirler. Tüm veriler yerel depolama (Local Storage) kullanılarak kaydedilir.

## Özellikler

- **Görev Ekleme:** Kullanıcılar, görevlerini ekleyebilir.
- **Hatırlatıcı:** Görev için belirli bir tarih ve saat ayarlanabilir.
- **Görev Tamamlama:** Kullanıcılar görevlerini tamamladıkça işaretleyebilirler.
- **Görev Silme:** Kullanıcılar görevlerini silebilirler.
- **Tema Desteği:** Uygulama açık ve koyu tema arasında geçiş yapabilir.
- **Mobil Uyumluluk:** Uygulama, mobil cihazlar için uyumludur.
- **Veri Kaydetme:** Tüm veriler `localStorage`'a kaydedilir, böylece sayfa yenilense bile görevler kaybolmaz.

## Teknolojiler

- **HTML5**
- **CSS3**
- **JavaScript (Vanilla JS)**
- **LocalStorage**

## Kullanım

- [Link](https://aliegesazak.com/todo-app/)'e tıklayarak deneyimleyebilirsiniz.

### Görev Ekleme
   Görev eklemek için metin kutusuna görev başlığını yazın ve "Ekle" butonuna tıklayın.
   
   Eğer bir hatırlatıcı eklemek istiyorsanız, "Hatırlatıcı" kutusunu doldurun.

### Görev Tamamlama
   Görevler, sağ tarafındaki "Tamamla" butonuna tıklanarak tamamlanabilir.
   
   Tamamlanan görevler, tamamlandığı tarihe göre sıralanır ve renk değiştirilir.

### Görev Silme
   Görevleri silmek için görev kutusunun sağındaki "Sil" butonuna tıklayın.

### Tema Değiştirme
   Tema değiştirmek için sağ üst köşedeki tema değiştirme butonuna tıklayın.

### Hatırlatıcılar
   Hatırlatıcı süreleri dolduğunda, bir uyarı görüntülenir ve kullanıcıya görevle ilgili hatırlatıcı gösterilir.

## Katkı

Bu proje açık kaynaklıdır. Herhangi bir hata bulursanız veya özellik öneriniz varsa, lütfen bir pull request gönderin veya bir issue açın.

## Lisans

Bu proje MIT Lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakabilirsiniz.
