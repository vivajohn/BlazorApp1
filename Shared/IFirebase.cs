using BlazorApp1.Data;
using Google.Protobuf;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlazorApp1.Shared
{
    public interface IFirebase
    {
        Task<User> GetUserInfo(string uid);

        Task<Topic[]> GetTopics(IUser user);

        Task<Deck> GetPairs(IUser user, Deck deck);

        Task<List<PromptResponsePair>> GetCurrentPairs(IUser user);

        Task<( string blobType, ByteString data )> GetRecording(IUser user, Prompt prompt);
    }
}
