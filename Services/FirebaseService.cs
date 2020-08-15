using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Google.Cloud.Firestore;
using System.Diagnostics;
using MatBlazor;
using BlazorApp1.Shared;
using Microsoft.AspNetCore.Components;
using Google.Protobuf;
using FirebaseAdmin.Auth;

namespace BlazorApp1.Data
{
    // Access the Cloud Firestore database
    public class FirebaseService : IFirebase
    {
        private static readonly string projectId = "flashdev-69399";

        private FirestoreDb db = FirestoreDb.Create(projectId);

        public FirebaseService()
        {
        }

        // Get the user's list of language pairs  (i.e. en-de). Usually there is only one.
        public async Task<User> GetUserInfo(string uid)
        {
            var snapshot = await db.Collection("users").Document(uid).GetSnapshotAsync();
            var user = snapshot.ConvertTo<User>();
            return user;
        }

        // Get the user's list of language pairs  (i.e. en-de). Usually there is only one.
        public async Task<Topic[]> GetTopics(IUser user)
        {
            var snapshot = await db.Collection("topics").WhereEqualTo("uid", user.uid).GetSnapshotAsync();
            var docs = snapshot.Documents.ToArray();
            var topics = Array.ConvertAll<DocumentSnapshot, Topic>(
                docs, x => x.ConvertTo<Topic>());
            return topics;
        }

        // Get the pairs for a deck (for the recording page)
        public async Task<Deck> GetPairs(IUser user, Deck deck)
        {
            var snapshot = await db.Collection("prpairs").WhereEqualTo("uid", user.uid).WhereEqualTo("deckId", deck.id).GetSnapshotAsync();
            var docs = snapshot.Documents.ToArray();
            deck.groups = Array.ConvertAll<DocumentSnapshot, PromptResponsePair>(
               docs, x => x.ConvertTo<PromptResponsePair>()).ToList<PromptResponsePair>();
            return deck;
        }

        // Gets the currently active pairs for the playback page
        public async Task<List<PromptResponsePair>> GetCurrentPairs(IUser user)
        {
            var currentTopicId = (await user.User()).currentTopicId;

            var snapshot = await db.Collection("prpairs")
                .WhereEqualTo("uid", user.uid)
                .WhereEqualTo("topicId", currentTopicId)
                .WhereEqualTo("isActive", true)
                .OrderBy("nextDate")
                .Limit(20)
                .GetSnapshotAsync();

            var docs = snapshot.Documents.ToArray();
            var array = Array.ConvertAll<DocumentSnapshot, PromptResponsePair>(
              docs, x => x.ConvertTo<PromptResponsePair>()).ToList<PromptResponsePair>();
            return array;
        }

        public async Task<(string blobType, ByteString data)> GetRecording(IUser user, Prompt prompt)
        {
            var key = $"{user.uid}_{prompt.id}";
            var snapshot = await db.Collection("blobs").Document(key).GetSnapshotAsync();

            // The returned data is a Firestore blob which has its own particular format
            var blobType = snapshot.GetValue<string>("type");
            var data = snapshot.GetValue<ByteString>("blob");
            return (blobType, data);
        }
    }
}
