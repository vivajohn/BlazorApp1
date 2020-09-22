using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.JSInterop;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reactive.Linq;
using System.Reactive.Subjects;
using System.Threading.Tasks;

namespace BlazorApp1.Shared
{
    // This is used for getting asynchronous results from javacript code.
    // The js code calls OnNext which then triggers an observable object.
    public class PromiseHandler<T>
    {
        private ReplaySubject<T> obs = new ReplaySubject<T>();

        public IObservable<T> ToObservable()
        {
            return obs;
        }

        [JSInvokable]
        public void OnNext(string json)
        {
            var obj = JsonConvert.DeserializeObject<T>(json);
            obs.OnNext(obj);
        }
    }
}
