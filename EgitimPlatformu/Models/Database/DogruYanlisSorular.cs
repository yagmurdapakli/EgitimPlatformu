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
    
    public partial class DogruYanlisSorular
    {
        public int DogruYanlisSorularId { get; set; }
        public bool DogruSecenek { get; set; }
    
        public virtual Sorular Sorular { get; set; }
    }
}
