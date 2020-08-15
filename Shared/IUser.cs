using BlazorApp1.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlazorApp1.Shared
{
    public interface IUser
    {
        string uid { get; }

        // This is the Firestore user record
        Task<User> User();
    }
}
