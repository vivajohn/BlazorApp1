using BlazorApp1.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlazorApp1.Data
{
    // Represents the user and contains the user's record from the database
    public class UserService : IUser
    {
        public string uid => "WTatLnFyjJceDeS4QGMLo3PjFjm1";

        private IFirebase fs;
        private User _user = null;
        public async Task<User> User() 
        { 
            if (_user == null)
            {
                _user = await fs.GetUserInfo(uid);
            }
            return _user;
        }

        public UserService(IFirebase fs) 
        {
            this.fs = fs;
        }
    }
}
