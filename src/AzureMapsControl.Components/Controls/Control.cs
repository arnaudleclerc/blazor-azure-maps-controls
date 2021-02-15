﻿namespace AzureMapsControl.Components.Controls
{
    using System;
    using System.Text.Json;
    using System.Text.Json.Serialization;

    [JsonConverter(typeof(ControlJsonConverter))]
    public abstract class Control
    {
        internal abstract string Type { get; }

        /// <summary>
        /// Position of the control
        /// </summary>
        public ControlPosition Position { get; }

        internal Control(ControlPosition position) => Position = position;
    }

    public abstract class Control<T> : Control
        where T : ControlOptions
    {
        /// <summary>
        /// Options of the control
        /// </summary>
        public T Options { get; }

        internal Control(T options, ControlPosition position) : base(position) => Options = options;
    }

    internal class ControlJsonConverter : JsonConverter<Control>
    {
        public override Control Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options) => throw new NotImplementedException();
        public override void Write(Utf8JsonWriter writer, Control value, JsonSerializerOptions options)
        {
            switch (value.Type)
            {
                case "compass":
                    CompassControlJsonConverter.Write(writer, value as CompassControl);
                    break;
                case "pitch":
                    PitchControlJsonConverter.Write(writer, value as PitchControl);
                    break;
                case "style":
                    StyleControlJsonConverter.Write(writer, value as StyleControl);
                    break;
                case "zoom":
                    ZoomControlJsonConverter.Write(writer, value as ZoomControl);
                    break;
                case "scalebar":
                    ScaleBarControlJsonConverter.Write(writer, value as ScaleBarControl);
                    break;
            }
        }
    }
}
