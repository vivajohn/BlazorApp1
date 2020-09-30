using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.JSInterop;
using Newtonsoft.Json;
using System;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reactive.Linq;
using System.Reactive.Subjects;
using System.Threading.Tasks;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace BlazorApp1.Shared
{
    // This is used for getting asynchronous results from javacript code.
    // The js code calls OnNext which then triggers an observable object.
    public class JSAsyncResult<T>
    {
        private ReplaySubject<T> obs = new ReplaySubject<T>();

        public IObservable<T> ToObservable()
        {
            return obs;
        }

        [JSInvokable]
        public void OnNext(string json)
        {
            // This can receive null when the js code is signalling that an activity has finished, such as
            // sound playback, and there is no associated data. 
            var obj = JsonSerializer.Deserialize<T>(json ?? "{}");
            obs.OnNext(obj);
        }

        private class xxx { public string blob { get; set; } };

        [JSInvokable]
        public void Test(string buffer)
        {
            var obj = JsonSerializer.Deserialize<xxx>(buffer ?? "{}");
            Debug.WriteLine("JSAsyncResult.Test");
        }

        [JSInvokable]
        public void OnCompleted()
        {
            obs.OnCompleted();
        }

        [JSInvokable]
        public void OnError(string message)
        {
            obs.OnError(new Exception(message));
        }
    }
}
