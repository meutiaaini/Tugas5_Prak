/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import ComicsController from '#controllers/comics_controller'

// Rute dasar untuk mengecek koneksi
router.get('/', async () => {
  return {
    pesan: 'Selamat datang di API Manajemen Komik',
    versi: '1.0.0'
  }
})

// Grup rute untuk komik
router.group(() => {
  // GET /comics - Menampilkan semua komik
  router.get('/comics', [ComicsController, 'index'])
  
  // GET /comics/:id - Menampilkan detail komik
  router.get('/comics/:id', [ComicsController, 'show'])
  
  // POST /comics - Menambahkan komik baru
  router.post('/comics', [ComicsController, 'store'])

  // PUT /comics/:id - Mengupdate komik
  router.put('/comics/:id', [ComicsController, 'update'])

  // DELETE /comics/:id - Menghapus komik
  router.delete('/comics/:id', [ComicsController, 'destroy'])
})