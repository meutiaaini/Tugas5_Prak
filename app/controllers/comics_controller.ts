import { HttpContext } from '@adonisjs/core/http'
import Comic from '#models/comic'

export default class ComicsController {
  /**
   * GET /comics - Menampilkan semua daftar komik
   */
  async index({ response }: HttpContext) {
    const comics = await Comic.all()
    return response.json({ 
      data: comics,
      pesan: "Berhasil mendapatkan daftar komik" 
    })
  }

  /**
   * GET /comics/:id - Menampilkan detail komik berdasarkan ID
   */
  async show({ params, response }: HttpContext) {
    try {
      const comic = await Comic.findOrFail(params.id)
      return response.json({ 
        data: comic,
        pesan: "Berhasil mendapatkan detail komik" 
      })
    } catch (error) {
      return response.status(404).json({ 
        pesan: "Komik tidak ditemukan",
        error: error.message 
      })
    }
  }

  /**
   * POST /comics - Membuat komik baru
   */
  async store({ request, response }: HttpContext) {
    const data = request.only(['title', 'author', 'year'])
    
    // Validasi data wajib
    if (!data.title || !data.author || !data.year) {
      return response.status(400).json({ 
        pesan: "Gagal menambahkan komik",
        error: "Harap isi semua field (judul, penulis, tahun)" 
      })
    }

    try {
      const comic = await Comic.create(data)
      return response.status(201).json({ 
        data: comic,
        pesan: "Komik berhasil ditambahkan" 
      })
    } catch (error) {
      return response.status(500).json({
        pesan: "Gagal menambahkan komik",
        error: error.message
      })
    }
  }

  /**
   * PUT /comics/:id - Mengupdate komik
   */
  async update({ params, request, response }: HttpContext) {
    const data = request.only(['title', 'author', 'year'])
    
    // Validasi
    if (!data.title || !data.author || !data.year) {
      return response.status(400).json({ 
        pesan: "Gagal update komik",
        error: "Harap isi semua field (judul, penulis, tahun)" 
      })
    }

    try {
      const comic = await Comic.findOrFail(params.id)
      comic.merge(data)
      await comic.save()

      return response.json({ 
        data: comic,
        pesan: "Komik berhasil diupdate" 
      })
    } catch (error) {
      return response.status(404).json({ 
        pesan: "Gagal update komik",
        error: "Komik tidak ditemukan" 
      })
    }
  }

  /**
   * DELETE /comics/:id - Menghapus komik
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const comic = await Comic.findOrFail(params.id)
      await comic.delete()

      return response.json({ 
        pesan: "Komik berhasil dihapus" 
      })
    } catch (error) {
      return response.status(404).json({ 
        pesan: "Gagal menghapus komik",
        error: "Komik tidak ditemukan" 
      })
    }
  }
}
