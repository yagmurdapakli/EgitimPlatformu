//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace EgitimPlatformu.Models.Database
{
    using System;
    using System.Collections.Generic;
    
    public partial class EgitimSeans
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public EgitimSeans()
        {
            this.KisiSeans = new HashSet<KisiSeans>();
        }
    
        public int EgitimSeansId { get; set; }
        public int DersId { get; set; }
        public string Katilimcilar { get; set; }
        public string FKEgitmenId { get; set; }
        public System.DateTime HedefTarihi { get; set; }
        public System.DateTime BitisTarihi { get; set; }
    
        public virtual Dersler Dersler { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<KisiSeans> KisiSeans { get; set; }
    }
}
