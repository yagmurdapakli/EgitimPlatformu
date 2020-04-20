﻿using AutoMapper;
using DataLayer.EntityFramework;
using Entities;
using Entities.InputModel;
using Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EgitimPlatformu.Controllers
{
    public class SinificiDersController : Controller
    {

        DataContext db = new DataContext();
        // GET: SinificiDers
        public ActionResult Index()
        {
           
            var Derslerim = db.Dersler.ToList();
            return View(Derslerim);
        }

        [HttpPost]
        public JsonResult Search(string arananstring)
        {
            var Derslerim = db.Dersler.Where(x => x.DersAdi.Contains(arananstring)/*|| x.DersKodu.Contains(arananstring) || x.Kategoriler.KategoriAdi.Contains(arananstring)*/).ToList();

            List<SelectListItem> model = new List<SelectListItem>();

            foreach (var item in Derslerim)
            {
                model.Add(new SelectListItem()
                {
                    Value = item.DersId.ToString(),
                    Text = item.DersAdi,

                }); ;

            }
            return Json(model, JsonRequestBehavior.AllowGet);

        }

      
        public ActionResult DersEkle()
        {
            return View();

        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult DersEkle(SinifciDersEkleIM yeniDers, HttpPostedFileBase DersAfis)
        {
            string path = "/Content/img/DersAfisleri/";


            if (DersAfis != null)
            {


                string fileName = Path.GetFileName(DersAfis.FileName);
                var combinedName = Path.Combine(path, fileName);
                if (!Directory.Exists(Server.MapPath(path)))
                {
                    Directory.CreateDirectory(Server.MapPath(path));
                }
                DersAfis.SaveAs(Server.MapPath(path + fileName));
                yeniDers.DersAfis = combinedName;
            }

          
                Dersler model = new Dersler
                {
                    DersId = yeniDers.DersId,
                    DersAdi = yeniDers.DersAdi,
                    DersKodu = yeniDers.DersKodu,
                    KategoriId =yeniDers.KategoriId,
                    Aciklama = yeniDers.Aciklama,
                    EgitimTuru = yeniDers.EgitimTuru,
                    EgitmenId = 2,
                    DersAfis = yeniDers.DersAfis,
                    SinifIciDers = new SinifIciDers
                    {  
                        EgitimSorumlusu = yeniDers.EgitimSorumlusu,
                        HedefKitle = yeniDers.HedefKitle,
                        Seans = yeniDers.Seans,
                        SeansPeriyodu = yeniDers.SeansPeriyodu,
                     },
                };

            
            db.Dersler.Add(model);
            db.SaveChanges();
           

            return RedirectToAction("Index");
        

        }

        [HttpGet]
        public JsonResult KategoriGetir()
        {
            var firmalar = db.Kategoriler.ToList();

            List<SelectListItem> model = new List<SelectListItem>();

            foreach (var adi in firmalar)
            {
                model.Add(new SelectListItem()
                {
                    Value = adi.KategoriId.ToString(),
                    Text = adi.KategoriAdi,

                }); 

            }
            return Json(model, JsonRequestBehavior.AllowGet);

        }

        public ActionResult Sil(int DersId)
        {
            Dersler secilenDers = db.Dersler.Find(DersId);
            SinifIciDers secilenSinificiDers = db.SinifIciDers.Find(DersId);
            if (ModelState.IsValid)
            {   db.SinifIciDers.Remove(secilenSinificiDers);
                db.Dersler.Remove(secilenDers);
               
                db.SaveChanges();
            }
            return RedirectToAction("Index");
          
        }

        public ActionResult Duzenle(int id)
        {
            var ders=db.Dersler.Find(id);
            var sinifici=db.SinifIciDers.Find(id);

            DersDuzenleVM model = new DersDuzenleVM();

            model.dersler = ders;
            model.sinificiders = sinifici;
            
            return View(model);
        }


    }
}